import DetailedView from '@/components/DetailedView.tsx';
import DownloadButton from '@/components/DownloadButton.tsx';
import JsonInput from '@/components/JsonInput.tsx';
import ModalEdit from '@/components/ModalEdit.tsx';

function App() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold">JSON Array Parser</h1>
        <JsonInput />
      </div>

      <h2 className="text-xl font-bold text-center">JSON Data:</h2>

      <DetailedView />

      <div className="flex justify-center mt-2">
        <DownloadButton />
      </div>

      <ModalEdit />
    </div>
  )
}

export default App;
