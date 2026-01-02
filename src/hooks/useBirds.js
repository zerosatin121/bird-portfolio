import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const MOCK_BIRDS = [
    {
        id: '1',
        english_name: 'Great Blue Heron',
        local_name: 'Blue Heron',
        scientific_name: 'Ardea herodias',
        description: 'A large wading bird in the heron family Ardeidae, common throughout most of North America, in the summer as far north as Alaska and the southern provinces of Canada.',
        fun_fact: 'Great Blue Herons can hunt in both day and night thanks to a high percentage of rod-type photoreceptors in their eyes.',
        location: 'Everglades, Florida',
        population_status: 'Common',
        thumbnail: 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&w=800&q=80',
        slug: 'great-blue-heron',
        tags: ['Waterbird', 'Large'],
        view_count: 1240
    },
    {
        id: '2',
        english_name: 'Bald Eagle',
        local_name: 'Sea Eagle',
        scientific_name: 'Haliaeetus leucocephalus',
        description: 'A bird of prey found in North America. A sea eagle, it has two known subspecies and forms a species pair with the white-tailed eagle.',
        fun_fact: 'Bald eagles are not actually bald; their name comes from an older meaning of the word "white-headed".',
        location: 'Alaska, USA',
        population_status: 'Recovering',
        thumbnail: 'https://images.unsplash.com/photo-1510618031347-1949175608b4?auto=format&fit=crop&w=800&q=80',
        slug: 'bald-eagle',
        tags: ['Raptor', 'National'],
        view_count: 3500
    },
    {
        id: '3',
        english_name: 'Scarlet Macaw',
        local_name: 'Guacamaya Roja',
        scientific_name: 'Ara macao',
        description: 'A large red, yellow, and blue Central and South American parrot, a member of a large group of Neotropical parrots called macaws.',
        fun_fact: 'They can live for up to 60 years in the wild.',
        location: 'Amazon Rainforest, Brazil',
        population_status: 'Vulnerable',
        thumbnail: 'https://images.unsplash.com/photo-1552728089-57bdde30ebe3?auto=format&fit=crop&w=800&q=80',
        slug: 'scarlet-macaw',
        tags: ['Tropical', 'Colorful'],
        view_count: 2100
    }
];

export const useBirds = () => {
    const [birds, setBirds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchBirds = async () => {
        try {
            setLoading(true)
            if (!import.meta.env.VITE_SUPABASE_URL) {
                setBirds(MOCK_BIRDS)
                return
            }

            const { data, error } = await supabase
                .from('birds')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBirds(data.length > 0 ? data : MOCK_BIRDS)
        } catch (err) {
            console.error('Error fetching birds:', err)
            setBirds(MOCK_BIRDS)
        } finally {
            setLoading(false)
        }
    }

    const fetchBirdBySlug = async (slug) => {
        try {
            setLoading(true)
            if (!import.meta.env.VITE_SUPABASE_URL) {
                return MOCK_BIRDS.find(b => b.slug === slug) || null
            }

            const { data, error } = await supabase
                .from('birds')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error) throw error
            return data
        } catch (err) {
            console.error('Error fetching bird:', err)
            return MOCK_BIRDS.find(b => b.slug === slug) || null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBirds()
    }, [])

    return { birds, loading, error, fetchBirds, fetchBirdBySlug }
}
