import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import './HomePage.scss';

class HomePage extends Component {
  render() {
    return (
      <main className='homepage'>
        <div className='container'>
          <div>
            <Post
              user={{
                name: 'huubinh49',
                position: 'Frontend Developer',
                avatar:
                  'https://res.cloudinary.com/daten/image/upload/v1650819174/avatar_mlwjsm.jpg',
              }}
              post={{
                status:
                  'Lorem qwe qwe qwe qwe qw eq weq we qwe qwe q we qwe q we qw e qwe qw e',
                createdAt: '14:30pm',
                images: [
                  'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-1.jpg',
                  'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-3.jpg',
                ],
              }}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
