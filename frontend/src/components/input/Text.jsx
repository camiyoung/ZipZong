export default function Text(props){

  return (
    <div>
      <label for={props.labelInput}>{props.name}</label>
      <input className="border-solid border-black" id={props.labelInput} />
    </div>
  )
}