--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: director; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.director (id, "firstName", "lastName") FROM stdin;
1	Martin	Scorsese
2	Quentin	Tarantino
3	James	Cameron
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, name) FROM stdin;
1	Action
2	Comedy
3	Drama
4	Advantures
5	Fantasy
\.


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie (id, name, "releaseYear", "fileUrl", "directorId") FROM stdin;
1	The Wolf of Wall Street	2013	https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg	1
3	Goodfellas	1990	https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY2972_.jpg	1
4	Once Upon a Time in Hollywood	2019	https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UY9000_.jpg	2
2	The Departed	2006	https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_FMjpg_UX450_.jpg	1
5	Pulp Fiction	1994	https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1055_.jpg	2
6	Inglourious Basterds	2009	https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UY3000_.jpg	2
7	The Terminator	1993	https://m.media-amazon.com/images/M/MV5BMmZlYTA4MjQtODM5MS00ZTdhLWFlMmUtODU2MDk2YmFkNGE4XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_FMjpg_UX769_.jpg	3
8	Titanic	1997	https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UY3000_.jpg	3
9	The Abyss	1989	https://m.media-amazon.com/images/M/MV5BYmU4NmUxZjEtYjY0OC00ZDAwLTg0MGQtMDRkNDk5NWQ0OTQ5XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UY2879_.jpg	3
\.


--
-- Data for Name: movie_genres_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_genres_genre ("movieId", "genreId") FROM stdin;
1	2
1	3
2	1
2	2
2	3
3	1
3	3
4	1
4	2
5	1
5	2
5	4
6	1
6	2
6	4
7	1
7	4
8	3
8	4
9	4
9	5
\.


--
-- Name: director_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.director_id_seq', 3, true);


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 5, true);


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 9, true);


--
-- PostgreSQL database dump complete
--

