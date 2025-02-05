
import './chat.scss';

const Chat = () => {
    return (
        <div className={"chat-wrapper"}>
            <div className={"sidebar-wrapper"}>
                <div className={"user_conversation--wrapper"}>                    
                    <img src={"https://via.placeholder.com/150"} alt={"User"} />
                    <div className={"user_conversation--info"}>
                        <h4>John Doe</h4>
                        <p className={"last-message"}>Hey! How are you?</p>
                    </div>
                    <label className={"message-time"}>52m</label>
                </div>
                
            </div>
            <div className={"conversation-wrapper"}>
                <div className={"conversation-header"}>
                    header here
                </div>
                <div className={"conversation-body"}>
                    <div className={"message--received"}>
                       <div className={"message-text--received"}>
                           <p>
                               Hey how you've been?
                           </p>
                           <img src={"https://via.placeholder.com/150"} alt={"User"} />
                       </div>
                        <label>12:52pm</label>
                    </div>
                    <div className={"message--sent"}>
                        <div className={"message-text--sent"}>
                            <p>
                                Good! Been traveling a lot lately. Got lots of stories to share.
                            </p>
                            <img src={"https://via.placeholder.com/150"} alt={"User"} />
                        </div>
                        <label>12:55pm</label>
                    </div>
                </div>
                <div className={"conversation-footer"}>
                    <input className={"input-send-msg"} type={"text"} placeholder={"Send a message"} />
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;