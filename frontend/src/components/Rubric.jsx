import { useEffect, useState } from "react";

const Rubric = ({ committeeId, memberId }) => {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${apiUrl}/committees/${committeeId}/members/${memberId}/rubric`)
                if (!response.ok) {
                    throw new Error("Error fetching image data")
                }
                const data = await response.json()
                setImageData(data[0]?.rubric)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchImage()
    }, [committeeId, memberId])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
        {imageData ? (
                <img
                    src={`data:image/png;base64,${imageData}`}
                    alt="Rúbrica"
                    style={{ maxWidth: "50%", height: "auto", margin: "2% 0" }}
                    className="mx-auto mt-10 rounded-lg shadow-lg justify-center items-center"
                />
            ) : (
                <p>No se pudo cargar la rúbrica.</p>
            )}
        </>
    )
}

export default Rubric;