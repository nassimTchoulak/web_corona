
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

export function color_from_string(str){

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    let v1 =  (str.charCodeAt(0)*25)%100 ;

    let v2 =  (str.charCodeAt(1)*25)%100 ;

    let v3 =  (str.charCodeAt(2)*25)%100 ;
    console.log("#"+v1+v2+v3 )

    return "#"+pad(v1)+pad(v2)+pad(v3) ;
}

export function parser_date(str){
    let dt = new Date(str);

    let pr =["dimanche","lundi","mardi","mercredi","jeudi","vendredi","Samedi"];

    return (pr[dt.getDay()]+"  "+dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" ");
}

export function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}