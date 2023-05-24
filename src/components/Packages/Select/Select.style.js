import {css} from '@emotion/css';

export const labelWrapper = css`
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const container = css`
  width: 100%;
`;

export const select = ({isDisabled, error, isLoading, isOpen}) => css`
  background-color: ${error ? '#edbfbe' : 'white'};
  border: 1px solid ${isDisabled ? 'silver' : error ? 'red' : isOpen ? 'black' : 'grey'};
  color: ${isDisabled ? 'silver' : 'black'};
  cursor: ${isDisabled ? 'not-allowed' : isLoading ? 'progress' : 'pointer'};
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0;
  line-height: 24px;
  text-align: left;
  padding: 9px 13px 11px 12px;
  > div > div {
    border: 0;
    height: 24px;
    padding: 0;
    > input {
      margin: 0;
    }
  }
  &:focus,
  &:hover,
  &:active {
    border: 1px solid blue;
  }
`;
export const input = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 37px);
`;
export const indicators = css`
  display: flex;
`;
export const indicator = css`
  align-items: center;
  border-left: 1px solid silver;
  display: flex;
  margin-left: 6px;
  padding-left: 12px;

  i {
    display: block;
    font-size: 1.125rem;
    margin-top: 3px;
  }
`;
export const optionsWrapper = ({length, width, isMulti}) => css`
  background-color: white;
  border: black 1px solid;
  border-top: 0;
  height: ${Math.min(length, 5) * (isMulti ? 53 : 45) + 'px'};
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  width: ${width - 29}px;
  z-index: 1;
  padding: 0;
  margin: 0;
`;
export const optionGroup = css`
  > div:not(:first-child) {
    padding-left: 32px;
  }
`;
export const option = ({isDisabled, isNested, isMulti, isLoading}) => css`
  align-items: center;
  color: ${isDisabled ? 'silver' : 'black'};
  cursor: ${isDisabled ? 'not-allowed' : isLoading ? 'progress' : 'pointer'};
  width: calc(100% - ${isNested ? '44px' : '23px'});
  font-size: 1rem;
  display: flex;
  justify-content: ${isMulti ? 'flex-start' : 'space-between'};
  line-height: 24px;
  padding: 9px 11px 11px 12px;

  > input {
    margin-right: 12px;
  }

  i {
    font-size: 1.125rem;
    margin-top: 2px;
    margin-left: 16px;
    width: 20px;
  }

  &:focus,
  &:hover,
  &:active {
    background-color: silver;
  }
`;
export const optionGroupLabel = css`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;
