import fs from 'fs';
import AdmZip, { IZipEntry } from 'adm-zip';
import {RpsContext,RpsModule,rpsAction,R} from 'rpscript-interface';

/** Zipping and extracting files
 * @see {@link https://www.npmjs.com/package/adm-zip|Zip}
 * @namespace Zip
 * 
 * @example
 * rps install zip
 * 
 * 
*/
@RpsModule("zip")
export default class RPSAdmZip {

/**
 * @function compress-files
 * @memberof Zip
 * @example
 * ;Write to a file call back.zip, compress temp folder and readme.md file
 * compress-files "backup.zip" "./temp/" "./readme.md"
 * @param {string} zipFile name of the zip file
 * @param {Array} entries the list of files or folders to be zipped
 * 
 * @returns {string} the compressed filename 
 * 
 * @summary compress-files :: String → *... → String
 * @summary Zipping file by specifying the filename and the list of entries
 * 
 * 
*/
  @rpsAction({verbName:'compress-files'})
  async zip (ctx:RpsContext,opts:Object, zipFile:string, ...entries:string[]) : Promise<string|Function>{
    var that = this;

    function fn (...entries) {
      let z = new AdmZip();
    
      entries.forEach(function(ent) {
        if(that.isFolder(ent)) z.addLocalFolder(ent)
        else z.addLocalFile(ent);
      });
  
      z.writeZip(zipFile);

      return zipFile;
    }
    

    if(entries && entries.length > 0) return R.apply(fn,entries);
    else return fn;
  }

  isFolder(path:string) {
    return fs.lstatSync(path).isDirectory();
  }

  /**
 * @function extract-files
 * @memberof Zip
 * @example
 * ;Extract the zip file to the folder temp
 * extract-zip "backup.zip" "./temp/"
 * @param {string} zipFile filename of the zip file.
 * @param {string} extractTo directory to extract to.
 * @returns {string} zip file's name
 * 
 * @summary extract-zip :: (String,String) → String
 * 
*/
  @rpsAction({verbName:'extract-files'})
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
 * @summary get-zip-entries :: String → [IZipEntry]
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
