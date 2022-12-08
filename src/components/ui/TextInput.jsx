/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
export default function TextInput({ title, ...attributes }) {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700">{title}</label>
            <input
                type="text"
                className="mt-1 block w-full h-8 shadow-sm sm:text-sm  rounded-md border-indigo-300 border"
                {...attributes}
            />
        </>
    );
}
