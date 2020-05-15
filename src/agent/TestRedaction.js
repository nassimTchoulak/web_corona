
import React from "react";
import ReactMarkdown  from 'react-markdown'

const TestRedaction = (props)=>{


    const input = '# This is a header\n\nAnd this is a paragrap'

    return <div className={"col-xs-12"}> <ReactMarkdown source={input} /> </div>
}

export default TestRedaction