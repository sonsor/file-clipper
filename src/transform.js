const { Transform } = require('stream');

/**
 *
 */
class FileClipperTransform extends Transform {

  /**
   *
   * @param initVect
   * @param opts
   */
  constructor(initVect, opts) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }

  /**
   *
   * @param chunk
   * @param encoding
   * @param cb
   * @private
   */
  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

module.exports = FileClipperTransform;
