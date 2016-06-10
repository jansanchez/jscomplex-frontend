#!/usr/bin/env node
'use strict';

const Complex = require('jscomplex');
const options = {json: true};

const complex = new Complex(['/home/jan/projects/web/ofertop-web/**/**/*.js'], options);

complex.process(data => {
  if (options.json === true) {
    console.log(data);
  }
});
