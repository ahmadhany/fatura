CREATE DATABASE faturadb
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8';

CREATE SEQUENCE public.categories_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" integer,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId")
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE SEQUENCE public.products_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.products
(
    id integer NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    "imageURI" character varying(255) COLLATE pg_catalog."default",
    featured boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "categoryId" integer,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId")
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE SEQUENCE public.providers_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.providers
(
    id integer NOT NULL DEFAULT nextval('providers_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT providers_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE public.provider_products_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.provider_products
(
    id integer NOT NULL DEFAULT nextval('provider_products_id_seq'::regclass),
    price double precision,
    available boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productId" integer,
    "providerId" integer,
    CONSTRAINT provider_products_pkey PRIMARY KEY (id),
    CONSTRAINT "provider_products_productId_providerId_key" UNIQUE ("productId", "providerId"),
    CONSTRAINT "provider_products_productId_fkey" FOREIGN KEY ("productId")
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "provider_products_providerId_fkey" FOREIGN KEY ("providerId")
        REFERENCES public.providers (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
CREATE INDEX price_index
    ON public.provider_products USING btree
    (price ASC NULLS LAST)
    TABLESPACE pg_default;
