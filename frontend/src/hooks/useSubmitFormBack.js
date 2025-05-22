import { useFormHandler } from './useFormHandler'; 

const useSubmitFormBack = (form, setOption) => {
    const handler = useFormHandler({
        form,
        onSuccess: () => setOption(prev => prev - 1),
    });

    return handler;
};

export default useSubmitFormBack;
