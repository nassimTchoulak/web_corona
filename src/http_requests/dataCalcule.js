
export function parser_diff(a){
    if(Math.floor(a/(1000*3600*24*7))!==0){
        return Math.floor(a/(1000*3600*24*7))+" Sem";
    }
    else{
        if(Math.floor(a/(1000*3600*24))!==0){
            return Math.floor(a/(1000*3600*24))+" j";
        }else{
            if(Math.floor(a/(1000*3600))!==0){
                return Math.floor(a/(1000*3600))+" h";
            }
            else{
                return Math.floor(a/(1000*60))+" m";
            }



        }
    }
}
export function parser_diff_comment(str){
    let date0 = new Date();
    // date0.setHours(date0.getHours() - 1);
    let old = new Date(str);
    return parser_diff(Math.abs(old.getTime() - date0.getTime())) ;
}