
interface InputProps {
    onChange?: () => void
    placeholder:string
    reference?:any
}
export function Input({onChange , placeholder, reference}: InputProps){
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} onChange={onChange} className="px-4 py-2 border m-2 rounded-sm"></input>
    </div>
}