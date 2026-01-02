import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useBirds = () => {
    const [birds, setBirds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchBirds = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('birds')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBirds(data)
        } catch (err) {
            console.error('Error fetching birds:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchBirdBySlug = async (slug) => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('birds')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching bird:', err)
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBirds()
    }, [])

    return { birds, loading, error, fetchBirds, fetchBirdBySlug }
}
