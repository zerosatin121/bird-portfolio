import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const MOCK_EVENTS = [
    {
        id: 'e1',
        title: 'Morning Marsh Observation',
        event_date: '2025-11-15',
        location_name: 'Chestnut Nature Park',
        description: 'A crisp morning spent observing waterbirds. The lighting was perfect for capturing the Heron in its natural hunting stance.',
        bird_species_spotted: ['Great Blue Heron', 'Kingfisher', 'Egret'],
        images: [{ url: 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&w=800&q=80' }],
        slug: 'morning-marsh-observation'
    },
    {
        id: 'e2',
        title: 'Rainforest Canopy Flight',
        event_date: '2025-10-22',
        location_name: 'Amazon Buffer Zone',
        description: 'We trekked deep into the canopy to sight the Macaws. The vibrant colors against the green background were breathtaking.',
        bird_species_spotted: ['Scarlet Macaw', 'Toucan', 'Harpy Eagle'],
        images: [{ url: 'https://images.unsplash.com/photo-1552728089-57bdde30ebe3?auto=format&fit=crop&w=800&q=80' }],
        slug: 'rainforest-canopy-flight'
    }
];

export const useEvents = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            if (!import.meta.env.VITE_SUPABASE_URL) {
                setEvents(MOCK_EVENTS)
                return
            }

            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('event_date', { ascending: false })

            if (error) throw error
            setEvents(data.length > 0 ? data : MOCK_EVENTS)
        } catch (err) {
            console.error('Error fetching events:', err)
            setEvents(MOCK_EVENTS)
        } finally {
            setLoading(false)
        }
    }

    const fetchEventBySlug = async (slug) => {
        try {
            setLoading(true)
            if (!import.meta.env.VITE_SUPABASE_URL) {
                return MOCK_EVENTS.find(e => e.slug === slug) || null
            }

            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching event:', err)
            return MOCK_EVENTS.find(e => e.slug === slug) || null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return { events, loading, error, fetchEvents, fetchEventBySlug }
}
