export default function LargeTextInput(props){

  return (
    <div class="mb-6">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{props.inputName}</label>
      <input type="text" id="large-input" class="block p-4 w-96 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
  )
}