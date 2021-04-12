/*---------------------------------
    Users
*/---------------------------------

insert into users (unqid, user_nick, user_flair, email, password) 
values ('user01', 'Adam Sandler', 'Has a secret life', 'adam@mail.com', '$2a$11$hoAmVu39X2S2kOkRDvpTJuxnJ52qwvxld4qA875P4tMdWWJvcWKlS');

insert into users (unqid, user_nick, user_flair, email, password) 
values ('user02', 'Eve Purple', 'Ate a rib', 'eve@mail.com', '$2a$11$JJ208A0w6T94i7g3mMSR0OlIlBKXev84ifakIU3l6TFRKSla.Yv9W');

insert into tags (name, post_id, user_id, voted) 
values ('nature', 'dummy_post', 'dummy_user', 'up');
insert into tags (name, post_id, user_id, voted) 
values ('science', 'dummy_post', 'dummy_user', 'up');
insert into tags (name, post_id, user_id, voted) 
values ('funny', 'dummy_post', 'dummy_user', 'up');
insert into tags (name, post_id, user_id, voted) 
values ('politics', 'dummy_post', 'dummy_user', 'up');
insert into tags (name, post_id, user_id, voted) 
values ('news', 'dummy_post', 'dummy_user', 'up');

insert into allowed_tags (unqid, name) 
values ('4c22cf6a-0dd0-4556-b9f8-24b4d04958b3','nature');
insert into allowed_tags (unqid, name) 
values ('2b6d9ac6-5f90-47fe-81f1-95c09648327e', 'science');
insert into allowed_tags (unqid, name) 
values ('84dc6c7d-c693-4e70-9863-3a3a7da262dd', 'funny');
insert into allowed_tags (unqid, name) 
values ('2402a67b-08e4-43c7-b1c6-156a9d1b66b0', 'politics');
insert into allowed_tags (unqid, name) 
values ('20681b11-450c-4015-9d98-fbf3678f2d66', 'news');
insert into allowed_tags (unqid, name) 
values ('af6adbb7-80cd-4b3c-b3b7-063aadae67be','police');

insert into comments (unqid, level, post_id, parent_id,  content, user_id, user_nick) 
values ('cid100', 0, 'ef32e3be-b0fb-45fa-a537-bda9d8818338' , '', 'This is a PARENT level comment', 'dummy_user_id', 'JRR Tolkien');

insert into comments (unqid, level, post_id, parent_id,  content, user_id, user_nick) 
values ('cid110', 1, 'ef32e3be-b0fb-45fa-a537-bda9d8818338' , 'cid100', 'This is a CHILD level comment','dummy_user_id', 'Mark Twain');

insert into comments (unqid, level, post_id, parent_id,  content, user_id, user_nick) 
values ('cid120', 1, 'ef32e3be-b0fb-45fa-a537-bda9d8818338' , 'cid100', 'This is a 2nd CHILD level comment','dummy_user_id', 'JK Rowling');

insert into comments (unqid, level, post_id, parent_id,  content, user_id, user_nick) 
values ('cid112', 2, 'ef32e3be-b0fb-45fa-a537-bda9d8818338' , 'cid110', 'This is a GRANDCHILD level comment','dummy_user_id', 'RL Stephenson');

insert into comments (unqid, level, post_id, parent_id,  content, user_id, user_nick) 
values ('cid200', 0, 'ef32e3be-b0fb-45fa-a537-bda9d8818338' , '', 'This is 2nd PARENT level comment','dummy_user_id', 'Dante');
