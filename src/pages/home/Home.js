
import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import { auth, db } from '../../services/firebase'
import {
    addDoc,
    collection,
    onSnapshot,
    QuerySnapshot,
    serverTimestamp,
    query,
    orderBy,
    limit,
    updateDoc,
    doc,
    getDoc,
} from 'firebase/firestore'
import {
    Avatar,
    AvatarGroup,
    ChatContainer,
    Conversation,
    ConversationHeader,
    ConversationList,
    Message,
    MessageInput,
    MessageList,
} from '@chatscope/chat-ui-kit-react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

export default function Home() {
    const [message, setMessage] = useState([])
    const [input, setInput] = useState('')
    const [chatData, setChatData] = useState('')

    function handleInputChange(event) {
        const { value } = event.target
        setInput(value)
    }

    useEffect(() => {
        const q = query(
            collection(db, 'chats'),
            limit(10)
        )
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = []
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id })
            })
            setMessage(fetchedMessages)
        })
        return () => unsubscribe
    }, [message, chatData])

    async function sendMessage(event) {
        event.preventDefault();
        if (input.trim() === "") {
            alert("Enter valid message");
            return;
        }

        const chatRef = doc(db, 'chats', chatData.id)
        const chatSnap = await getDoc(chatRef)
        await updateDoc(chatRef, {
            messages: [
                ...chatSnap.data().messages,
                {
                    content: input,
                    sentTime: Date.now(),
                    sender: 'Carlos',
                    direction: 'outgoing',
                    position: 'single'
                }
            ]
        })

        // THIS CODE WAS USED FOR INSERT DOCUMENTS IN DATABASE, BECAUSE THAT IS IMPORTANTE TO MAINTAIN FOR TESTS

        // await addDoc(collection(db, "chats"), {
        //     users: {
        //         sender: "Eu",
        //         receiver: 'Joaquim'
        //     },
        //     messages: [
        //         {
        //             content: 'Oi, tudo bem?',
        //             sentTime: Date.now(),
        //             sender: '',
        //             direction: 'outgoing',
        //             position: 'single'
        //         },
        //     ]
        // })

        setInput('')
    }

    const handlerChatData = (data) => {
        setChatData(data)
    }

    return (
        <div className='wrapper'>
            <div className='contacts'>
                <div style={{
                    height: "340px"
                }}>
                    <ConversationList>
                        {message && message.map(chat =>
                            <Conversation
                                key={chat.id}
                                name={chat.users.receiver}
                                info={chat.messages[0].content}
                                onClick={() => handlerChatData(chat)}
                            >
                                <Avatar src={'https://picsum.photos/100'} />
                            </Conversation>)}
                    </ConversationList>
                </div>
            </div>
            <div className='chat-container'>
                <div className='chat'>
                    <div style={{
                        height: "600px"
                    }}>
                        <>
                            {chatData ?
                                <ChatContainer>
                                    <ConversationHeader>
                                        <Avatar src={'https://picsum.photos/100'} name='' />
                                        <ConversationHeader.Content userName={chatData.users.receiver} info="Active 10 mins ago" />
                                    </ConversationHeader>
                                    <MessageList>
                                        {chatData && chatData.messages.map(item =>
                                            <Message model={{
                                                message: item.content,
                                                sentTime: "15 mins ago",
                                                sender: item.sender,
                                                direction: item.direction,
                                                position: item.position
                                            }}>
                                                <Avatar src={'https://picsum.photos/100'} name={item.sender} />
                                            </Message>
                                        )}
                                    </MessageList>
                                    <MessageInput onSend={sendMessage} />
                                </ChatContainer>
                                :
                                <div className='logo-wrapper'>
                                    <img src='https://a.storyblok.com/f/196576/x/2d01804b43/logo-black.svg' />
                                    <h1 className='title-chat'>Chat Notomia</h1>
                                </div>
                            }
                        </>
                    </div>
                </div>
                <div className='input-message'>
                    <input
                        className='input'
                        placeholder='Type a message...'
                        id='messageInput'
                        name='messageInput'
                        onChange={handleInputChange}
                    />
                    <p onClick={sendMessage}>Send</p>
                </div>
            </div>
        </div >
    )
}