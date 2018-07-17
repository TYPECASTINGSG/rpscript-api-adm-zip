import fs from 'fs';
import AdmZip, { IZipEntry } from 'adm-zip';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

/** Zipping and extracting files
 * @see {@link https://www.npmjs.com/package/adm-zip|Zip}
 * @namespace Zip
 * 
 * @example
 * rps install adm-zip
 * 
 * 
*/
@RpsModule("adm-zip")
export default class RPSAdmZip {

/**
 * @function zip
 * @memberof Zip
 * @example
 * ;Write to a file call back.zip, compress temp folder and readme.md file
 * zip "backup.zip" "./temp/" "./readme.md"
 * @param {string} zipFile filename of the zip file
 * @param {Array} entries the list of files or folders to be zipped
 * @returns {string} the compressed filename 
 * @summary Zipping file by specifying the filename and the list of entries
 * 
 * 
*/
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

  /**
 * @function extract-zip
 * @memberof Zip
 * @example
 * ;Extract the zip file to the folder temp
 * extract-zip "backup.zip" "./temp/"
 * @param {string} zipFile filename of the zip file.
 * @param {string} extractTo directory to extract to.
 * @returns {string} zip file's name
 * @summary Extract a zip file.
 * 
*/
  @rpsAction({verbName:'extract-zip'})
  async extractAllTo (ctx:RpsContext,opts:Object, zipFile:string, extractTo:string) : Promise<string>{
    let z = new AdmZip(zipFile);
    
    z.extractAllTo(extractTo);
    
    return extractTo;
  }


  /**
 * @function get-zip-entries
 * @memberof Zip
 * @example
 * get-zip-entries "backup.zip"
 * @param {string} zipFile filename of the zip file.
 * @returns {Array} IZipEntry. The object format which includes the metadata.
 * @summary Get zip file entries information
 * 
 * @see {@link https://www.npmjs.com/package/adm-zip}
 * 
*/
  @rpsAction({verbName:'get-zip-entries'})
  async getZipEntries (ctx:RpsContext,opts:Object, zipFile:string) : Promise<IZipEntry[]>{
    let z = new AdmZip(zipFile);

    return z.getEntries();
  }

}
