import './style.css';

document.querySelector('#app').innerHTML = `

<h1>Message Writer</h1>

<form name="generator">
  <label>Format</label>
  <select name="format">
    <option value="json">JSON</opton>
    <option value="yml">YAML</opton>
    <option value="java">JAVA Properties</opton>
  </select>
  <label>Prefix</label>
  <input name="prefix" placeholder="prefix" value="messages"/>
  <div >
    <textarea name="input" >Hello World</textarea>
    <textarea name="output" readonly></textarea>
  </dv>
</form>
`;

const form = document.forms.generator;
const fields = document.forms.generator.elements;
document.querySelector('form').onkeyup = run;
document.querySelector('select').onchange = run;

run();

function run() {
  let data = getMessages();

  switch (fields.format.value) {
    case 'json':
      fields.output.value = getJSON(data);
      break;
    case 'yml':
      fields.output.value = getYML(data);
      break;
    case 'java':
      fields.output.value = getJavaProperties(data);
      break;
  }
}

function getJSON(data) {
  return JSON.stringify(data, null, ' ');
}

function getTxt(data, oporator) {
  let output = '';
  Object.keys(data).forEach((k) => {
    output += `${k}${oporator}${data[k]}\n`;
  });
  return output;
}

function getJavaProperties(data) {
  return getTxt(data, '=');
}

function getYML(data) {
  return getTxt(data, ': ');
}

function getArray() {
  return fields.input.value.split('\n');
}

function getMessages() {
  const data = getArray();
  const output = {};
  data.forEach((d) => {
    output[getKey(d)] = d;
  });
  return output;
}

function getPrefix() {
  const p = formatKey(fields.prefix.value);
  return p ? p + '.' : '';
}

function getKey(d) {
  return getPrefix() + formatKey(d);
}

function formatKey(d) {
  return d
    .replace(/\s|\-|\//g, '_')
    .replace(/\'/g, '')
    .toLowerCase()
    .replace(/__/g, '_')
    .replace(/__/g, '_')
    .replace(/__/g, '_');
}
