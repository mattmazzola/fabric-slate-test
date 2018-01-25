import * as React from 'react'
import * as OF from 'office-ui-fabric-react'
import { Modal as FabricModal } from 'office-ui-fabric-react/lib/Modal'
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
  isModalOpen0: boolean
  isModalOpen1: boolean
  isModalOpen2: boolean
  isModalOpen3: boolean
  isModalOpen4: boolean
  values: SlateValue[]
  values2: SlateValue[]
}

const initialState: State = {
  isModalOpen0: false,
  isModalOpen1: false,
  isModalOpen2: false,
  isModalOpen3: false,
  isModalOpen4: false,
  values: (new Array(numberOfInputsPerModal).fill(0).map((_, i) => createInitialValue(`Editor ${i}`))),
  values2: (new Array(numberOfInputsPerModal).fill(0).map((_, i) => createInitialValue(`Editor ${i}`)))
}

class App extends React.Component<{}, State> {
  state = initialState

  onClickButton0 = () => {
    this.setState({
      isModalOpen0: true
    })
  }

  onClickClose0 = () => {
    this.setState({
      isModalOpen0: false
    })
  }

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

  onClickButton4 = () => {
    this.setState({
      isModalOpen4: true
    })
  }

  onClickClose4 = () => {
    this.setState({
      isModalOpen4: false
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

  onChangeValue2(value: any, change: any) {
    const newValue = change.value
    const originalValueIndex = this.state.values2.findIndex(v => v === value)
    const newValues = [
      ...this.state.values.slice(0, originalValueIndex),
      newValue,
      ...this.state.values.slice(originalValueIndex + 1)
    ]

    this.setState({
      values2: newValues
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>Fabric Modal Focus Bug</h1>

          <div className="buttons">
            <button type="button" onClick={this.onClickButton0}>Open <b>NativeModal</b> with Standard Inputs</button>
            <button type="button" onClick={this.onClickButton1}>Open <b>FabricModal</b> with Standard Inputs</button>
            <button type="button" onClick={this.onClickButton2}>Open <b>FabricModal</b> with OF.TextFields</button>
            <button type="button" onClick={this.onClickButton3}>Open <b>FabricModal</b> with Slate Editors</button>
            <button type="button" onClick={this.onClickButton4}>Open <b>NativeModal</b> with Slate Editors</button>
          </div>
        </header>

        <NativeModal
          isOpen={this.state.isModalOpen0}
        >
          <div className="modal">
            <div className="test-modal test-modal--native">
              <div className="test-modal-content">
                <h2>Native Modal with Standard Inputs</h2>
                <div>
                  <button type="button" className="close-button" onClick={this.onClickClose0}>Close Modal</button>
                </div>
                <div className="inputs">
                  {new Array(numberOfInputsPerModal).fill(0).map((_, i) =>
                    <div key={i}>
                      <label htmlFor={`input${i}`}>Input {i}</label>
                      <input id={`input${i}`} type="text" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </NativeModal>

        <FabricModal
          containerClassName="test-modal"
          isOpen={this.state.isModalOpen1}
        >
          <div className="test-modal-content">
            <h2>Fabric Modal with Standard Inputs</h2>
            <div>
              <button type="button" className="close-button" onClick={this.onClickClose1}>Close Modal</button>
            </div>
            <div className="inputs">
              {new Array(numberOfInputsPerModal).fill(0).map((_, i) =>
                <div key={i}>
                  <label htmlFor={`input${i}`}>Input {i}</label>
                  <input id={`input${i}`} type="text" />
                </div>
              )}
            </div>
          </div>
        </FabricModal>

        <FabricModal
          containerClassName="test-modal"
          isOpen={this.state.isModalOpen2}
        >
          <div className="test-modal-content">
            <h2>Fabric Modal with OF.TextFields</h2>
            <div>
              <button type="button" className="close-button" onClick={this.onClickClose2}>Close Modal</button>
            </div>
            <div className="inputs">
              {new Array(numberOfInputsPerModal).fill(0).map((_, i) =>
                <div key={i}>
                  <OF.TextField
                    label={`Input ${i}`}
                    value={`Input ${i}`}
                  />
                </div>
              )}
            </div>
          </div>
        </FabricModal>

        <FabricModal
          containerClassName="test-modal"
          isOpen={this.state.isModalOpen3}
        >
          <div className="test-modal-content">
            <h2>Fabric Modal with OF.TextFields</h2>
            <div>
              <button type="button" className="close-button" onClick={this.onClickClose3}>Close Modal</button>
            </div>
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
        </FabricModal>

        <NativeModal
          isOpen={this.state.isModalOpen4}
        >
          <div className="modal">
            <div className="test-modal test-modal--native">
              <div className="test-modal-content">
                <h2>Native with Slate Inputs</h2>
                <div>
                  <button type="button" className="close-button" onClick={this.onClickClose4}>Close Modal</button>
                </div>
                <div className="inputs">
                  {this.state.values2.map((value, i) =>
                    <div key={i}>
                      <label>Input {i}</label>
                      <Editor
                        className="editor"
                        onChange={(change: any) => this.onChangeValue2(value, change)}
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
