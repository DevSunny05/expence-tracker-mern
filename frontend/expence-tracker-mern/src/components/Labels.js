import React from 'react'

const obj=[
    {
        type:"Saving",
        color:"rgb(255, 99, 132)",
        percent:45
    },
    {
        type:"Investment",
        color:"rgb(54, 162, 235)",
        percent:25
    },
    {
        type:"Expence",
        color:'rgb(255, 205, 86)',
        percent:30
    }
]

const Labels = () => {
  return (
    <div>
      {
        obj.map((v,i)=><LabelComponent key={i} data={v}/>)
      }
    </div>
  )
}


function LabelComponent({data}){
    return(
        <div className="label flex justify-between">
            <div className="flex gap-2">
                <div className='w-2 h-2 rounded py-3' style={{background:data.color??'#f9c74f'}}></div>
                <h3 className='text-md '>{data.type??""}</h3>
            </div>
            <h3 className='font-bold'>{data.percent??""}%</h3>
        </div>
    )
}


export default Labels
