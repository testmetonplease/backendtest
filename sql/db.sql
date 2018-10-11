--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Authorization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Authorization" (
    email character varying(100) NOT NULL,
    password character varying(250)
);


ALTER TABLE public."Authorization" OWNER TO postgres;

--
-- Name: Blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Blogs" (
    __v integer,
    label character varying(100),
    title character varying(150),
    "metaTitle" character varying(150),
    "metaDescription" character varying(250),
    "metaKeywords" character varying(250),
    body text,
    "authorName" character varying(100),
    "createdAt" timestamp without time zone,
    status character varying(50),
    "updatedAt" timestamp with time zone,
    _id uuid NOT NULL,
    author uuid,
    "deletedAt" time with time zone
);


ALTER TABLE public."Blogs" OWNER TO postgres;

--
-- Name: Comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comments" (
    __v integer,
    text character varying(500),
    title character varying(150),
    "createdAt" timestamp without time zone,
    status character varying(50),
    author uuid,
    "updatedAt" timestamp with time zone,
    "parentId" uuid,
    "articleId" uuid,
    _id uuid NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Comments" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    _id uuid NOT NULL,
    firstname character(64),
    lastname character(64),
    email character(128),
    password character(60),
    role character(60),
    "createdAt" time with time zone,
    "updatedAt" time with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Data for Name: Authorization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Authorization" (email, password) FROM stdin;
\.


--
-- Data for Name: Blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Blogs" (__v, label, title, "metaTitle", "metaDescription", "metaKeywords", body, "authorName", "createdAt", status, "updatedAt", _id, author, "deletedAt") FROM stdin;
0	\N	hi budy	\N	\N	\N	\N	vasya2                                                          	2018-10-07 15:37:04.138	new	2018-10-07 18:37:04.138+03	d72cf790-ca46-11e8-8641-85981979a599	968b2700-c962-11e8-9e46-91181531596c	16:21:01.665+00
0	\N	goodman bkkkkkkoba362rrttt33	goldman sack52rttr	dddd null	gold,man,sackr	wat5 is a variant of the English word what that is often used to express confussion or disgust756rrrtt33	vasya2                                                          	2018-10-07 16:27:11.304	new	2018-10-07 19:27:11.304+03	d7961570-ca4d-11e8-9662-6df3b24603e5	968b2700-c962-11e8-9e46-91181531596c	16:29:53.537+00
0	\N	goodman bkkkkkkoba362rrttt33	goldman sack52rttr	dddd null	gold,man,sackr	wat5 is a variant of the English word what that is often used to express confussion or disgust756rrrtt33	vasya2                                                          	2018-10-07 16:30:20.037	new	2018-10-07 19:30:20.037+03	48149b50-ca4e-11e8-9662-6df3b24603e5	968b2700-c962-11e8-9e46-91181531596c	16:32:19.104+00
0	\N	goodman bkkkkkkoba362rrttt33	goldman sack52rttr	dddd null	gold,man,sackr	wat5 is a variant of the English word what that is often used to express confussion or disgust756rrrtt33	vasya2                                                          	2018-10-07 16:33:12.84	deleted	2018-10-07 20:25:32.831+03	af141970-ca4e-11e8-bd08-2757b0c9c9ab	968b2700-c962-11e8-9e46-91181531596c	17:25:32.865+00
0	\N	goodman bkkkkkkoba362rrttt33	goldman sack52rttr	dddd null	gold,man,sackr	wat5 is a variant of the English word what that is often used to express confussion or disgust756rrrtt33	vasya2                                                          	2018-10-07 17:26:38.73	new	2018-10-07 20:26:38.73+03	25f01790-ca56-11e8-b1a2-ff9e4bbeab7d	968b2700-c962-11e8-9e46-91181531596c	\N
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comments" (__v, text, title, "createdAt", status, author, "updatedAt", "parentId", "articleId", _id, "deletedAt") FROM stdin;
0	You are amazing!	hi budy	2018-10-07 15:37:41.597	deleted	968b2700-c962-11e8-9e46-91181531596c	2018-10-07 21:28:53.105+03	\N	1ec16d70-ca1f-11e8-b732-f951ceb5a6f8	ed80c1c0-ca46-11e8-8641-85981979a599	2018-10-07 21:28:53.144+03
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (_id, firstname, lastname, email, password, role, "createdAt", "updatedAt", "deletedAt") FROM stdin;
f8fe0d90-c961-11e8-b33a-ad627a236a19	vasya1                                                          	\N	vasya1@mail.ru                                                                                                                  	$2a$10$CWJdKNLm401PMyAXBGIk.OnfCGUL5zq9pVl3/b8GJW22i95B5s84u	USER                                                        	12:18:46.122+00	12:18:46.122+00	\N
3c3c7ca0-ca33-11e8-97a2-d5774a27c987	vasya3                                                          	\N	vasya3@mail.ru                                                                                                                  	$2a$10$dbZ9UA1ZM9CSdo/UMZ.Iz.jptofAXaA48c/SvdpyiBHhLP847GCzu	USER                                                        	13:16:43.755+00	13:16:43.755+00	\N
968b2700-c962-11e8-9e46-91181531596c	vasya2                                                          	\N	vasya2@mail.ru                                                                                                                  	$2a$10$mYsOub0vz4y855O7Dp5.HOZJShjjAQQ1MEcS2rViJCBG3HBkuZoIa	ADMIN                                                       	12:23:10.45+00	14:41:30.549+00	\N
\.


--
-- Name: Blogs Blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blogs"
    ADD CONSTRAINT "Blogs_pkey" PRIMARY KEY (_id);


--
-- Name: Comments _id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT _id PRIMARY KEY (_id);


--
-- Name: Authorization email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Authorization"
    ADD CONSTRAINT email PRIMARY KEY (email);


--
-- Name: Users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- PostgreSQL database dump complete
--

