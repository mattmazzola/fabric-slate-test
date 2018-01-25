import * as React from 'react'
import * as OF from 'office-ui-fabric-react'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { Editor } from 'slate-react'
import { Value } from 'slate'
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

interface State {
  isModalOpen1: boolean
  isModalOpen2: boolean
  isModalOpen3: boolean
  input1: string
  values: SlateValue[]
}

const initialState: State = {
  isModalOpen1: false,
  isModalOpen2: false,
  isModalOpen3: false,
  input1: 'OF Input',
  values: (new Array(10).fill(0).map((_,i) => createInitialValue(`Editor ${i}`)))
}

class App extends React.Component<{}, State> {
  state = initialState

  onClickButton1 = () => {
    this.setState({
      isModalOpen1: true
    })
  }

  onClickClose1 = () => {
    this.setState({
      isModalOpen1: false
    })
  }

  onClickButton2 = () => {
    this.setState({
      isModalOpen2: true
    })
  }

  onClickClose2 = () => {
    this.setState({
      isModalOpen2: false
    })
  }

  onClickButton3 = () => {
    this.setState({
      isModalOpen3: true
    })
  }

  onClickClose3 = () => {
    this.setState({
      isModalOpen3: false
    })
  }

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState({
      input1: value
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
          <h1>Fabric Modal Focus Bug</h1>

          <div className="buttons">
            <button type="button" onClick={this.onClickButton1}>Open Modal with Standard Inputs</button>
            <button type="button" onClick={this.onClickButton2}>Open Modal with OF.TextFields</button>
            <button type="button" onClick={this.onClickButton3}>Open Modal with slate Editors</button>
          </div>
        </header>

        <Modal
          containerClassName="test-modal"
          isOpen={this.state.isModalOpen1}
        >
          <div className="test-modal-content">
            <h2>Test Modal with Standard Inputs</h2>
            <div>
              <button type="button" onClick={this.onClickClose1}>Close Modal</button>
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
            <div>
              <label>Input 1</label>
              <input type="text" value="abc" />
            </div>
          </div>
        </Modal>

        <Modal
          containerClassName="test-modal"
          isOpen={this.state.isModalOpen2}
        >
          <div className="test-modal-content">
            <h2>Test Modal with OF.TextFields</h2>
            <div>
              <button type="button" onClick={this.onClickClose2}>Close Modal</button>
            </div>
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
            <OF.TextField
              label="Input 1"
              value={'abc'}
            />
          </div>
        </Modal>

        <Modal
          containerClassName="test-modal"
          isOpen={this.state.isModalOpen3}
        >
          <div className="test-modal-content">
            <h2>Test Modal with OF.TextFields</h2>
            <div>
              <button type="button" onClick={this.onClickClose3}>Close Modal</button>
            </div>
            {this.state.values.map((value, i) =>
            <div>
              <label>Input {i}</label>
              <Editor
                className="editor"
                onChange={(change: any) => this.onChangeValue(value, change)}
                value={value}
              />
            </div>)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
