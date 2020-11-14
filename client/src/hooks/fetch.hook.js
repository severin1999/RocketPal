import { useState, useCallback } from 'react'

export const useFetch = () => {
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            console.log(response)
            const data = await response.json()
            console.log(data)


            if (!response.ok) {
                throw new Error(data.message)
            }

            return data
        } catch (e) {
            throw e
        }
    }, [])

    return { request }
}