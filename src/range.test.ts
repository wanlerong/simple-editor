import {splitRange, splitTextNode} from "./range";

test('splitTextNode', () => {
  let div = document.createElement("div")
  div.innerHTML = '123456'
  let range = new Range()
  range.setStart(div.firstChild, 1)
  range.setEnd(div.firstChild, 3)
  let data = splitTextNode((div.firstChild) as Text, range.startOffset, range.endOffset)  
  expect(data.before).toBe("1");
  expect(data.mid).toBe("23");
  expect(data.after).toBe("456");
});

test('splitTextNode_02', () => {
  let div = document.createElement("div")
  div.innerHTML = '123456'
  let data = splitTextNode((div.firstChild) as Text, 4)
  expect(data.before).toBe("1234");
  expect(data.mid).toBe("56");
  expect(data.after).toBe("");
});

test('splitRange_someNode', () => {
  let div = document.createElement("div")
  div.innerHTML = '123456'
  let range = new Range()
  range.setStart(div.firstChild, 1)
  range.setEnd(div.firstChild, 3)
  splitRange(range)
  expect(div.innerHTML).toBe("1<span>23</span>456");
});

test('splitRange_nodes', () => {
  let div = document.createElement("div")
  div.innerHTML = '<div>123456</div><div>abcdef</div>'
  let range = new Range()
  range.setStart(div.firstChild.firstChild, 2)
  range.setEnd(div.childNodes[1].firstChild, 3)
  splitRange(range)
  expect(div.innerHTML).toBe("<div>12<span>3456</span></div><div><span>abc</span>def</div>");
});

test('splitRange_node_in_span', () => {
  let div = document.createElement("div")
  div.innerHTML = '<div>12<span>3456</span></div><div>abcdef</div>'
  let range = new Range()
  range.setStart(div.firstChild.childNodes[1].firstChild, 1)
  range.setEnd(div.firstChild.childNodes[1].firstChild, 3)
  splitRange(range)
  expect(div.innerHTML).toBe("<div>12<span>3</span><span>45</span><span>6</span></div><div>abcdef</div>");
});

test('splitRange_node_in_span_with_style', () => {
  let div = document.createElement("div")
  div.innerHTML = '<div>12<span style="font-weight: bold;">3456</span></div><div>abcdef</div>'
  let range = new Range()
  range.setStart(div.firstChild.childNodes[1].firstChild, 1)
  range.setEnd(div.firstChild.childNodes[1].firstChild, 3)
  splitRange(range)
  expect(div.innerHTML).toBe('<div>12<span style="font-weight: bold;">3</span><span style="font-weight: bold;">45</span>' +
    '<span style="font-weight: bold;">6</span></div><div>abcdef</div>');
});

test('splitRange_node_in_span_not_same_node', () => {
  let div = document.createElement("div")
  div.innerHTML = '<div>12<span>3456</span></div><div><span>abcde</span>f</div>'
  let range = new Range()
  range.setStart(div.firstChild.childNodes[1].firstChild, 1)
  range.setEnd(div.childNodes[1].firstChild.firstChild, 3)
  splitRange(range)
  expect(div.innerHTML).toBe("<div>12<span>3</span><span>456</span></div><div><span>abc</span><span>de</span>f</div>");
});
