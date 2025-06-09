import {defineQuery} from "groq";

export const STARTUP_QUERY = defineQuery(
    `*[_type=="startup" && defined(slug.current)&& !defined($search) || category match $search || author->name match $search || title match $search]
    | order(_createdAt desc)
{
    _id,title,slug,_createdAt,
        author->{
            _id,name,image,bio
        },
        views,description,category,image
}`)

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type=='startup'&& _id==$id][0]{
  _id,
  slug,
  _createdAt,
  views,
  description,
  category,
  image,
  pitch,
  title,
  author->{
    _id,name,username,image,bio
  }
}`)

export const STARTUP_VIEW_BY_ID= defineQuery(`*[_type=='startup' && _id==$id][0]{
  _id,
  views,
}`)

export const AUTHOR_BY_GITHUB_USERNAME = defineQuery(`*[_type == 'author' && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == 'author' && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)

export const STARTUP_BY_AUTHOR_ID = defineQuery(
    `*[_type=="startup" && author._ref==$id]
    | order(_createdAt desc)
{
    _id,title,slug,_createdAt,
        author->{
            _id,name,image,bio
        },
        views,description,category,image
}`)

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`*[_type=='playlist' && slug.current==$slug][0]
{
_id,
slug,
title,
select[]->{
_id,
_createdAt,
title,
slug,
author->{_id,name,image,slug,bio},
views,
description,
category,
image,
pitch
},}`)