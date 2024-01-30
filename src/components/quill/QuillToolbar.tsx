import React from 'react'

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
}

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
]

const QuillToolbar = () => {
  return (
    <div id='toolbar'>
      <span className='ql-formats'>
        <select className='ql-header' defaultValue='4'>
          <option value='1'>Title</option>
          <option value='2'>SubTitle</option>
          <option value='3'>Subheading</option>
          <option value='4'>Normal</option>
        </select>
      </span>
      <span className='ql-formats'>
        <button className='ql-bold' />
        <button className='ql-italic' />
        <button className='ql-underline' />
        <button className='ql-strike' />
      </span>
      <span className='ql-formats'>
        <button className='ql-list' value='bullet' />
        <button className='ql-indent' value='-1' />
        <button className='ql-indent' value='+1' />
        <button className='ql-blockquote' />
      </span>
      <span className='ql-formats'>
        <select className='ql-align' />
        <select className='ql-color' />
        <select className='ql-background' />
      </span>
      <span className='ql-formats'>
        <button className='ql-link' />
        <button className='ql-image' />
        <button className='ql-code-block' />
      </span>
    </div>
  )
}

export default QuillToolbar
