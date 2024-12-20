const commentBtn = document.querySelectorAll(".comment-btn");
const closeBtn = document.querySelector("#close");
const form = document.querySelector("#form");
const subscription_modal = document.querySelector(".sub-modalContainer");
const close_btn = document.querySelector(".close");
const sub_btns = document.querySelectorAll(".subscribe");
const link_btn = document.querySelectorAll(".likeBtn");
const replyBtns = document.querySelectorAll(".replies");
const comment_box = document.querySelector('.comment-section');
const blogContainer = document.querySelector(".blogs-container");
const subscriptionForm = document.getElementById('sub-form');
const mini_container = document.querySelector('.blog-container'); 
console.log(mini_container)
const emails = getEmails();
const data =

        

        [
            {id: 0, title: 'title heading', titleDesc: 'Title description, May 1, 2021', img: 'Timeless.webp', 
                about: `Clothes ipsumLorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsum quae similique commodi enim consectetur cumque. Blanditiis 
                    recusandae id, deleniti dolorem repudiandae dignissimos voluptate 
                    tenetur. Voluptatem veniam excepturi quod ad sint quo? Quod nemo 
                    qui ullam modi reprehenderit rerum dolor, laudantium quam temporibus id
                `,
                
                replies: [{replier: 'Ali', date: formatTme(), repImg: 'Timeless.webp', reply: 'Nice Swag😀😀😀'},
                    {replier: 'Ous', date: formatTme(), repImg: 'diver.jpeg', reply: ' Fabulous😀😀😀'}  

                ]
            },

            {id: 1, title: 'title heading', titleDesc: 'Title description, April 4, 2025', img: 'shoe.jpg', 
                about: `Shoe ipsumLorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsum quae similique commodi enim consectetur cumque. Blanditiis 
                    recusandae id, deleniti dolorem repudiandae dignissimos voluptate 
                    tenetur. Voluptatem veniam excepturi quod ad sint quo? Quod nemo 
                    qui ullam modi reprehenderit rerum dolor, laudantium quam temporibus id
                `,
                
                replies: [{replier: 'G Boss', date: formatTme(), repImg: 'MenkInPaint.jpg', reply: 'Nice Swag😀😀😀'}]
            },

            {id: 2, title: 'title heading', titleDesc: 'Title description, Feb 2, 2011', img: 'man.avif', 
                about: `Jean ipsumLorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsum quae similique commodi enim consectetur cumque. Blanditiis 
                    recusandae id, deleniti dolorem repudiandae dignissimos voluptate 
                    tenetur. Voluptatem veniam excepturi quod ad sint quo? Quod nemo 
                    qui ullam modi reprehenderit rerum dolor, laudantium quam temporibus id
                `,
                
                replies: [{replier: 'Ali', date: formatTme(), repImg: 'katim the coder.jpg', reply: 'Nice Keffieh'}]
            },

            {id: 3, title: 'title heading', titleDesc: 'Title description, Jan 17, 2023', img: 'milan.jpg', 
                about: `Shirt ipsumLorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsum quae similique commodi enim consectetur cumque. Blanditiis 
                    recusandae id, deleniti dolorem repudiandae dignissimos voluptate 
                    tenetur. Voluptatem veniam excepturi quod ad sint quo? Quod nemo 
                    qui ullam modi reprehenderit rerum dolor, laudantium quam temporibus id
                `,
                
                
                replies: [

                ]
                    
                    
            }
        ];

        
         
        if(!localStorage.getItem('comments')){
            saveComments();
            console.log('data added')
        }
        
        else{
            console.log('Data already exists');
        }

        const blogs = getComments();
        
        blogs.forEach(displayBlogs);

        function saveComments(){
            const blogJson = JSON.stringify(data);
            localStorage.setItem('comments', blogJson);
        }

        function getComments(){
          const blogComments=  localStorage.getItem('comments') || '[]';
          return JSON.parse(blogComments)
        }

        function saveEmails(){
            let JsonEmail = JSON.stringify(emails)
            localStorage.setItem('emails', JsonEmail);
        }

        function getEmails(){
            const subscriptionEmail = localStorage.getItem('emails') || '[]';
            return JSON.parse(subscriptionEmail);
        }

       

        function addEmail(){
            let subscriber = document.getElementById('email').value;
            emails.push(subscriber);
            saveEmails();

        }


        function displayBlogs(element, index){
            let likeId = 'like-btn' + index;
            let blog = document.createElement('div');
            blog.classList.add('blog');

            let comments = document.createElement('div');
            comments.classList.add('comments');
            comments.style.display = 'none'

            let divider = document.createElement('hr');
            comments.appendChild(divider);
            let addCommentBtn = document.createElement('span');
            addCommentBtn.innerHTML = `<button class="comment-btn" onclick = 'addComment(${element.id})'>Add Comment</button>`
            console.log(comments);

            blog.innerHTML = `
            <div class ='container'>
                <h3>${element.title.toUpperCase()}</h3>
                <h5>${element.titleDesc}</h5>
                <img src='${element.img}' alt="" class = 'blog_img'>
                <p>${element.about}</p>
                <div class="buttons">
                    <button class="likeBtn" id = ${likeId} ><i class="fa-solid fa-thumbs-up"></i>Like</button>
                    <button class="replies" onclick = manageComments(${element.id})>Replies <span class="rep-span">${element.replies.length}</span></button>
                </div> 
            </div>    
            `
            //mini_container.appendChild(blog);
            mini_container.appendChild(blog);
            createComments(element.replies, comments);
            comments.appendChild(addCommentBtn);
            blog.appendChild(comments);
            let likeBtn = document.getElementById(likeId);
            //console.log(likeBtn);
            
            
            likeBtn.addEventListener( 'click', function(){
                
                element.liked = !element.liked;
                likeBtn.innerText = element.liked ?  '✔ Liked' : 'Like'
                saveComments();
            })

            likeBtn.innerText = element.liked ?  '✔ Liked' : 'Like'

  
        }

       

        
        

        function manageComments(childId){
            let blogComments = mini_container.children[childId].lastElementChild
            blogComments.style.display = (blogComments.style.display === 'none' ? 'flex' : 'none');
        }

        function manageLikedBlogs(index){
            let currentBlog = blogs[index]
            currentBlog.liked = (blogContainer.children[index].children[4].firstElementChild.innerText === 'Like')
            console.log( ` Blog ${index + 1} : ${blogs[index].liked}`);
            console.log(blogContainer.children[index].children[4].firstElementChild.innerText)
            //blogContainer.children[index].children[4].firstElementChild.innerText =  currentBlog.liked ? '✔ Liked' : 'Like';
            saveComments();
        }


        /*
        for (let index = 0; index < blogs.length; index++) {
            const element = blogs[index];
            let replies = element.replies;

            let blog = document.createElement('div');
            blog.classList.add('blog');

            let comments = document.createElement('div');
            comments.classList.add('comments');
            comments.style.display = 'none'

            let divider = document.createElement('hr');
            comments.appendChild(divider);
            let addCommentBtn = document.createElement('span');
            addCommentBtn.innerHTML = `<button class="comment-btn" onclick = 'addComment(${element.id})'>Add Comment</button>`

            console.log(comments);

            blog.innerHTML = `
                <h2>${element.title.toUpperCase()}</h2>
                <h4>${element.titleDesc}</h4>
                <img src='../images/${element.img}' alt="">
                <p>${element.about}</p>
                <div class="buttons">
                    <button class="likeBtn" onclick = 'manageLikedBlogs(${element.id})'><i class="fa-solid fa-thumbs-up"></i>Like</button>
                    <button class="replies" onclick = 'manageComments(${element.id})'>Replies <span class="rep-span">${element.replies.length}</span></button>
                </div>    
            `
            
            blogContainer.appendChild(blog);

            
            
            createComments(element.replies, comments);
            comments.appendChild(addCommentBtn);
            blog.appendChild(comments);
        
            function manageComments(childId){
               let blogComments = blogContainer.children[childId].lastElementChild
                blogComments.style.display = (blogComments.style.display === 'none' ? 'flex' : 'none');
            }  
            
            
        }
        */
         
        function createComments(reps, comments){
            for( let j = 0; j < reps.length; j++ ){
               let comment = document.createElement('div');
               comment.classList.add('comment'); 
               comment.innerHTML = `
                    <img src ='${reps[j].repImg}' alt = '' >
                    <div class="reply">
                        <h4>${reps[j].replier}<span>${reps[j].date}</span></h4>
                        <p> ${reps[j].reply} </p>
                    </div>  
               `
               comments.appendChild(comment);      
            }
        }
        
        function addComment(blogId){
            comment_box.style.display = 'block';
            console.log(blogId);
            let image = ['d2.jpeg', 'free.png', 'free2.avif', 'venono.jpeg', 'Chris-Williamson.jpeg',  ];
            let nextImage = Math.floor(Math.random() * image.length)
            
            form.onsubmit = function(e){
                e.preventDefault();
                let commentor = document.getElementById('nameValue').value;
                let message = document.getElementById('message').value;
                if(message === '' || commentor === '') alert('Enter  both name and message');
                else{
                    blogs.map( blog => {
                        if(blog.id === blogId){
                            blog.replies = [...blog.replies, {replier: commentor, date: formatTme(), repImg:image[nextImage], reply: message},];
                            
                            console.log(blog.replies);
                            let blogC = document.querySelector('.blog');
                            blogC.classList.add('blog');

                            let comments = document.querySelectorAll('.comments');
                            let replies = comments[blogId].previousElementSibling.lastElementChild.lastElementChild;
                            let n = blog.replies.length - 1;
                            console.log(blog.replies[n])
                        
                            let comment = document.createElement('div');
                            comment.classList.add('comment');
                            
                                
                                comment.innerHTML = `
                                
                                    <img src ='${blog.replies[n].repImg}' alt = ${blog.replies[n].repImg} >
                                    <div class="reply">
                                        <h5>${blog.replies[n].replier} <span>${blog.replies[n].date}</span></h5>
                                        <p> ${blog.replies[n].reply} </p>
                                    </div>
                                          
                                ` 
                            

                            comments[blogId].appendChild(comment);
                            
                            replies.innerText = blog.replies.length;
                            saveComments();

                            

                            
                        }
                    })
                }
                
            }
        }
        
      
        

        function formatTme(date){
            date  = new Date();
            let day = date.toDateString();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            if(minutes < 10  || hour < 10){
            minutes = minutes.toString().padStart(2, "0");
            hour = hour.toString().padStart(2, '0');
        }
        else{
            minutes = minutes;
            hour = hour;
        }
        return `${day} . ${hour}:${minutes}`;
       }



       function closeModal(){
        subscription_modal.style.display = 'none'
       }

       window.addEventListener('click', e => {
        if(e.target === subscription_modal){
           subscription_modal.style.display = 'none'
                    
        }
       })

       function openModal(e){
        e.preventDefault();
        subscription_modal.style.display = 'flex';
        subscription_modal.style.justifyContent = 'center';
        subscription_modal.style.alignItems = 'center';
       }