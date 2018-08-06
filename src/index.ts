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
 * @function compress
 * @memberof Zip
 * @example
 * ;Write to a file call back.zip, compress temp folder and readme.md file
 * compress "backup.zip" "./temp/" "./readme.md"
 * 
 * @param {string} zipFile name of the zip file
 * @param {List} entries the list of files or folders to be zipped
 * 
 * 
 * @summary compress :: String → ...String → String
 * @summary Zipping file by specifying the filename and the list of entries
 * 
 * 
*/
  @rpsAction({verbName:'compress'})
  async zip (ctx:RpsContext,opts:Object, zipFile:string, ...entries:string[]) : Promise<string|Function>{
    var that = this;

    function fn (zipF) {
      return function (...entries) {
        let z = new AdmZip();
    
        entries.forEach(function(ent) {
          if(that.isFolder(ent)) z.addLocalFolder(ent)
          else z.addLocalFile(ent);
        });
    
        z.writeZip(zipF);
  
        return zipF;
      }
    }
    

    if(entries && entries.length > 0) return R.apply(fn(zipFile),entries);
    else if (zipFile) return fn(zipFile);
    else return fn;
  }

  isFolder(path:string) {
    return fs.lstatSync(path).isDirectory();
  }

  /**
 * @function extract
 * @memberof Zip
 * @example
 * ;Extract the zip file to the folder temp
 * extract "backup.zip" "./temp/"
 * 
 * @param {string} zipFile filename of the zip file.
 * @param {string} extractTo directory to extract to.
 * 
 * @summary extract :: String → String → String
 * 
*/
  @rpsAction({verbName:'extract'})
  async extractAllTo (ctx:RpsContext,opts:Object,...params:string[]) : Promise<string|Function>{
    // zipFile:string, extractTo:string
    
    let fn = R.curry(function (zipF,extTo) {
      let z = new AdmZip(zipF);
      z.extractAllTo(extTo);

      return extTo;
    })
    
    
    return R.apply(fn,params);
  }


}
