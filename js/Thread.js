'use strict';
class Thread extends Worker {
  constructor(js) {
    super(URL.createObjectURL(new Blob([js.join('')])));
  }
}
