--
-- PostgreSQL database dump
--

\restrict MIZxDOAFYpbhUipgHcUyCCbj94SavHGwj5HvE9Ht1eC7Ug9aLXfZ593Mkxn6Y4Q

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-18 14:35:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 23061)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5972 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 23080)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5974 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 23062)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24218)
-- Name: candidaturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.candidaturas (
    id text NOT NULL,
    status text DEFAULT 'pendente'::text NOT NULL,
    "Usuario_ID" text NOT NULL,
    "Pet_ID" text NOT NULL,
    "ONG_ID" text NOT NULL
);


ALTER TABLE public.candidaturas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24181)
-- Name: ongs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ongs (
    id text NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    telefone text NOT NULL,
    endereco text NOT NULL
);


ALTER TABLE public.ongs OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 24193)
-- Name: pets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pets (
    id text NOT NULL,
    nome text NOT NULL,
    especie text NOT NULL,
    raca text,
    cor text NOT NULL,
    "dono_ID" text,
    "Ong_ID" text
);


ALTER TABLE public.pets OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24204)
-- Name: relatorios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relatorios (
    id text NOT NULL,
    tipo text NOT NULL,
    data_relato timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    localizacao public.geography(Point,4326) NOT NULL,
    descricao text NOT NULL,
    "Pet_ID" text NOT NULL
);


ALTER TABLE public.relatorios OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24168)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id text NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    telefone text NOT NULL,
    cidade text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 5794 (class 2606 OID 23075)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 5808 (class 2606 OID 24230)
-- Name: candidaturas candidaturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidaturas
    ADD CONSTRAINT candidaturas_pkey PRIMARY KEY (id);


--
-- TOC entry 5802 (class 2606 OID 24192)
-- Name: ongs ongs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ongs
    ADD CONSTRAINT ongs_pkey PRIMARY KEY (id);


--
-- TOC entry 5804 (class 2606 OID 24203)
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY (id);


--
-- TOC entry 5806 (class 2606 OID 24217)
-- Name: relatorios relatorios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relatorios
    ADD CONSTRAINT relatorios_pkey PRIMARY KEY (id);


--
-- TOC entry 5799 (class 2606 OID 24180)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 5800 (class 1259 OID 24232)
-- Name: ongs_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ongs_email_key ON public.ongs USING btree (email);


--
-- TOC entry 5797 (class 1259 OID 24231)
-- Name: usuarios_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email);


--
-- TOC entry 5812 (class 2606 OID 24258)
-- Name: candidaturas candidaturas_ONG_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidaturas
    ADD CONSTRAINT "candidaturas_ONG_ID_fkey" FOREIGN KEY ("ONG_ID") REFERENCES public.ongs(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5813 (class 2606 OID 24253)
-- Name: candidaturas candidaturas_Pet_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidaturas
    ADD CONSTRAINT "candidaturas_Pet_ID_fkey" FOREIGN KEY ("Pet_ID") REFERENCES public.pets(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5814 (class 2606 OID 24248)
-- Name: candidaturas candidaturas_Usuario_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidaturas
    ADD CONSTRAINT "candidaturas_Usuario_ID_fkey" FOREIGN KEY ("Usuario_ID") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5809 (class 2606 OID 24238)
-- Name: pets pets_Ong_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT "pets_Ong_ID_fkey" FOREIGN KEY ("Ong_ID") REFERENCES public.ongs(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5810 (class 2606 OID 24233)
-- Name: pets pets_dono_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT "pets_dono_ID_fkey" FOREIGN KEY ("dono_ID") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5811 (class 2606 OID 24243)
-- Name: relatorios relatorios_Pet_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relatorios
    ADD CONSTRAINT "relatorios_Pet_ID_fkey" FOREIGN KEY ("Pet_ID") REFERENCES public.pets(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5973 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-11-18 14:35:25

--
-- PostgreSQL database dump complete
--

\unrestrict MIZxDOAFYpbhUipgHcUyCCbj94SavHGwj5HvE9Ht1eC7Ug9aLXfZ593Mkxn6Y4Q

