/**
 * @module AdmZip
 */
import fs from 'fs';
import AdmZip, { IZipEntry } from 'adm-zip';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

@RpsModule("adm-zip")
export default class RPSAdmZip {

  @rpsAction({verbName:'zip'})
  async zip (ctx:RpsContext,opts:Object, zipFile:string, ...entries:string[]) : Promise<string>{
    let z = new AdmZip();
    
    entries.forEach(ent => {
      if(this.isFolder(ent)) z.addLocalFolder(ent)
      else z.addLocalFile(ent);
    });

    z.writeZip(zipFile);

    return zipFile;
  }

  private isFolder(path:string) {
    return fs.lstatSync(path).isDirectory();
  }

  @rpsAction({verbName:'extract'})
  async extractAllTo (ctx:RpsContext,opts:Object, zipFile:string, extractTo:string) : Promise<string>{
    let z = new AdmZip(zipFile);
    
    z.extractAllTo(extractTo);
    
    return extractTo;
  }

  @rpsAction({verbName:'getZipEntries'})
  async getZipEntries (ctx:RpsContext,opts:Object, zipFile:string) : Promise<IZipEntry[]>{
    let z = new AdmZip(zipFile);

    return z.getEntries();
  }

}
