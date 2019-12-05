import React from 'react'
import Button from '@material-ui/core/Button';

export const SubmitButton = ({values, elementName}) =>  <Button type='submit' variant="contained" color={
    elementName==='gallery' && values.images.length <= 0 ? 'default' : 'primary'} style={{marginTop: '20px'}}>
Submit
</Button>