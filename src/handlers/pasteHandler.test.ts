import {setRange} from "../range";
import {handlePaste} from "./pasteHandler";

class ClipboardEventMock extends Event {
  clipboardData: DataTransfer;

  constructor(type: string, options: ClipboardEventInit) {
    super(type, options);
    this.clipboardData = options.clipboardData || {} as DataTransfer;
  }
}

global.ClipboardEvent = ClipboardEventMock as any;

test('handlePaste', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">1</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '<div>111<div>222<div>333</div></div></div>';
      }
      return '';
    })
  } as unknown as DataTransfer;
  
  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });

  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1</div>' +
    '<div class="row">111</div>' +
    '<div class="row">222</div>' +
    '<div class="row">333</div>' 
    );
});

test('handlePaste2', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">1</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '111<span>aaa</span><div>222<div>333</div></div>';
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });

  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1111<span>aaa</span></div>' +
    '<div class="row">222</div>' +
    '<div class="row">333</div>'
  );
});

test('handlePaste3', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">1</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '<div>111<div>222<div>333</div></div>444</div>';
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });

  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1</div>' +
    '<div class="row">111</div>' +
    '<div class="row">222</div>' +
    '<div class="row">333</div>' +
    '<div class="row">444</div>'
  );
});

test('handlePaste4', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">1</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '111<span style="font-family: Times,serif; font-size: medium; font-weight: bold;">aaa</span>' +
          '<div>222<div>333</div></div>';
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });
  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);
  
  expect(div.innerHTML).toBe('<div class="row">1111<span style="font-weight: bold">aaa</span></div>' +
    '<div class="row">222</div>' +
    '<div class="row">333</div>'
  );
});

test('handlePaste5', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">1</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '111<span style="font-family: Times,serif; font-size: medium;">aaa</span>' +
          '<div>222<div>333</div></div>';
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });
  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1111<span>aaa</span></div>' +
    '<div class="row">222</div>' +
    '<div class="row">333</div>'
  );
});

test('handlePaste6', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">111</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '<span style="font-family: Times,serif;">aaa</span>';
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });
  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1<span>aaa</span>11</div>');
});

test('handlePaste7', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">111</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '';
      } else if (type === 'text/plain') {
        return 'text'
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });
  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1text11</div>');
});

test('handlePaste8', () => {
  let div = document.createElement("div")
  div.className = 'direct-editor'
  div.innerHTML = '<div class="row">111</div>'
  document.body.appendChild(div);

  // Create clipboard data mock
  let clipboardData: DataTransfer = {
    getData:  jest.fn().mockImplementation((type: string) => {
      if (type === 'text/html') {
        return '';
      } else if (type === 'text/plain') {
        return 'text\n222'
      }
      return '';
    })
  } as unknown as DataTransfer;

  let event: ClipboardEvent = new ClipboardEvent('paste', { clipboardData });
  setRange(div.firstChild.firstChild, 1, div.firstChild.firstChild, 1)
  handlePaste(event);

  expect(div.innerHTML).toBe('<div class="row">1text11</div>' +
    '<div class="row">222</div>');
});
