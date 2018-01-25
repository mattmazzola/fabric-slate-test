import * as React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import NativeModal from './Modal'
import './App.css';

type SlateValue = any

const createInitialValue = (s = '') => Value.fromJSON({
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            leaves: [{ text: s }]
          }
        ]
      }
    ]
  }
})

const numberOfInputsPerModal = 10

interface State {
  isModalOpen: boolean
  values: SlateValue[]
}

const initialState: State = {
  isModalOpen: false,
  values: (new Array(numberOfInputsPerModal).fill(0).map((_, i) => createInitialValue(`Editor ${i}`)))
}

class App extends React.Component<{}, State> {
  state = initialState

  onClickButton = () => {
    this.setState({
      isModalOpen: true
    })
  }

  onClickClose = () => {
    this.setState({
      isModalOpen: false
    })
  }

  onChangeValue(value: any, change: any) {
    const newValue = change.value
    const originalValueIndex = this.state.values.findIndex(v => v === value)
    const newValues = [
      ...this.state.values.slice(0, originalValueIndex),
      newValue,
      ...this.state.values.slice(originalValueIndex + 1)
    ]

    this.setState({
      values: newValues
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>Slate.js Scroll Bug</h1>

          <div className="buttons">
            <button type="button" onClick={this.onClickButton}>Open <b>NativeModal</b> with Slate Editors</button>
          </div>
        </header>

        <NativeModal
          isOpen={this.state.isModalOpen}
        >
          <div className="modal">
            <div className="test-modal test-modal--native">
              <div className="test-modal-content">
                <h2>Native Modal with Slate Inputs</h2>
                <div>
                  <button type="button" className="close-button" onClick={this.onClickClose}>Close Modal</button>
                </div>
                <div className="inputs">
                  {this.state.values.map((value, i) =>
                    <div key={i}>
                      <label>Input {i}</label>
                      <Editor
                        className="editor"
                        onChange={(change: any) => this.onChangeValue(value, change)}
                        value={value}
                      />
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </NativeModal>
      </div>
    );
  }
}

export default App;
