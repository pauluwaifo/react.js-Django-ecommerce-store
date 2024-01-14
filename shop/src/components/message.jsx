function Message({error, color, message}) {
    return ( 
        <div className={`${color} my-3`} role="alert">
            {error && error}
            {message && message}
        </div>
     );
}

export default Message;