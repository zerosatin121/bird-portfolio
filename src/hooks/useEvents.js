import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useEvents = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('event_date', { ascending: false })

            if (error) throw error
            setEvents(data)
        } catch (err) {
            console.error('Error fetching events:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchEventBySlug = async (slug) => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching event:', err)
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return { events, loading, error, fetchEvents, fetchEventBySlug }
}
