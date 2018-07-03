import {expect} from 'chai';
import m from 'mocha';

import RPSAdmZip from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Adm Zip', () => {

  m.it('should zip and extract', async function () {
    let zip = new RPSAdmZip;

    // let output = await zip.zip(new RpsContext,{},"test.zip","./src","./.vscode","./test/index.ts");
    // console.log(output);

    // let entries = await zip.getZipEntries(new RpsContext,{},'test.zip');
    // console.log(entries);

    // let extract = await zip.extractAllTo(new RpsContext,{},'test.zip','./temp/');
    // console.log(extract);

  }).timeout(0);

})
