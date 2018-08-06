import {expect} from 'chai';
import m from 'mocha';

import RPSAdmZip from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Adm Zip', () => {

  m.it('should zip and extract', async function () {
    let zip = new RPSAdmZip;

    let output = await zip.zip(new RpsContext,{},"test.zip","./src","./.vscode","./test/index.ts");
    expect(output).to.be.equals('test.zip');

    let fn:any = await zip.zip(new RpsContext,{},"test2.zip");
    expect(fn('./src','./.vscode')).to.be.equals('test2.zip');

    let extract:any = await zip.extractAllTo(new RpsContext,{},'test.zip');
    expect(extract('./temp/')).to.be.equals('./temp/');

  }).timeout(0);

})
