/* Example of Node 0.10 streaming interface. */

// only run these tests in node v0.10 and above.
if (/^v0\.[0-9]\./.test(process.version)) { return; }

var assert = require("assert");
var Bunzip = require('../');
var fs = require('fs');
var stream = require('stream');
var Fiber = require('fibers');

/** Use node-fibers to convert our synchronous Stream interface to the
  * standard node asynchronous interface. */
var BunzipStream = function() {
    var trans = this;
    stream.Transform.call(trans); // initialize superclass.
    this._fiber = new Fiber(function() {
        var buffer = [], pos = 0;
        var inputStream = new Bunzip.Stream();
        inputStream.readByte = function() {
            if (pos >= buffer.length) {
                buffer = Fiber.yield(); pos = 0;
            }
            return buffer[pos++];
        };
        var outputStream = new Bunzip.Stream();
        outputStream.writeByte = function(_byte) {
            this.write(new Buffer([_byte]),0,1);
        };
        outputStream.write = function(buffer, bufOffset, length) {
            if (bufOffset !== 0 || length !== buffer.length) {
                buffer = buffer.slice(bufOffset, bufOffset + length);
            }
            trans.push(buffer);
        };
        Bunzip.decode(inputStream, outputStream);
    });
    this._fiber.run();
};
BunzipStream.prototype = Object.create(stream.Transform.prototype);
BunzipStream.prototype._transform = function(chunk, encoding, callback) {
    this._fiber.run(chunk);
    callback();
};

describe('bzip2 streaming decode', function(){
  ['sample0', 'sample1', 'sample2', 'sample3', 'sample4'].forEach(function(f) {
      it('should correctly decode '+f, function(callback) {
          this.timeout(0); // no timeout!
          var referenceData = fs.readFileSync('test/'+f+'.ref');
          var inStream = fs.createReadStream('test/'+f+'.bz2');
          var outStream = inStream.pipe(new BunzipStream());
          var data = new Buffer(referenceData.length), pos = 0;
          outStream.on('readable', function() {
              var b = outStream.read(), i;
              for (i=0; i<b.length; i++) { data[pos++] = b[i]; }
          }).on('end', function() {
              assert.equal(pos, data.length);
              assert.equal(data.toString('hex'), referenceData.toString('hex'));
              callback();
          });
      });
  });
});
