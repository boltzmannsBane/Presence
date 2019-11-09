import React from 'react';
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';

export const Tweets = () => <section className='tweets'>
    <ul>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
            <li>
                <SRLWrapper>
                    <p>texttexttexttexttexttexttexttext</p>
                    <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                </SRLWrapper>
            </li>
        </InfiniteScroll>
    </ul>

</section>