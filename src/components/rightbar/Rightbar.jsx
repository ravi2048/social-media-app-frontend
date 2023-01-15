import "./Rightbar.scss";

export default function Rightbar() {
    return (
        <div className='rightbar'>
            <div className='container'>
                <div className='item'>
                    <span>Suggestions for you</span>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <span>John Doe</span>
                        </div>
                        <div className='buttons'>
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <span>John Doe</span>
                        </div>
                        <div className='buttons'>
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <span>Latest Activities</span>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <p>
                                <span>John Doe</span> added a post
                            </p>
                        </div>
                        <div className='timeline'>
                            <span>1 min ago</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <p>
                                <span>John Doe</span> liked your post
                            </p>
                        </div>
                        <div className='timeline'>
                            <span>1 min ago</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <p>
                                <span>John Doe</span> added a comment on your post
                            </p>
                        </div>
                        <div className='timeline'>
                            <span>1 min ago</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <p>
                                <span>John Doe</span> posted
                            </p>
                        </div>
                        <div className='timeline'>
                            <span>1 min ago</span>
                        </div>
                    </div>
                </div>

                <div className='item'>
                    <span>Online Friends</span>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <div className="online" />
                            <span>John Doe</span>
                        </div>
                        <div className='timeline'>
                            <span>Active now</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <div className="online" />
                            <span>John Doe</span>
                        </div>
                        <div className='timeline'>
                            <span>Active now</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <div className="online" />
                            <span>John Doe</span>
                        </div>
                        <div className='timeline'>
                            <span>Active now</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <div className="online" />
                            <span>John Doe</span>
                        </div>
                        <div className='timeline'>
                            <span>Active now</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <div className="online" />
                            <span>John Doe</span>
                        </div>
                        <div className='timeline'>
                            <span>Active now</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img
                                alt='user-icon'
                                src='https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            />
                            <div className="online" />
                            <span>John Doe</span>
                        </div>
                        <div className='timeline'>
                            <span>Active now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
