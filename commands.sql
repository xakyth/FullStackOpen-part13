CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Mluukkai', 'https://fullstackopen.com/', 'Full Stack Open');
insert into blogs (author, url, title, likes) values ('Dan Abramov', 'https://overreacted.io/the-two-reacts/', 'The Two Reacts', 10);