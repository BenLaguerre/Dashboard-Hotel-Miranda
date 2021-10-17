import React, { useRef } from 'react';
import styled from "styled-components";
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { convertDate } from './GuestItem';

const style = {
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
};

const TRow = styled.tr `
  height: 140px;
  border-bottom: solid #F8F8F8 1px;
	vertical-align: top;
	td {
		padding-top: 10px;
	}
	td:nth-of-type(3){
		width: 60%;
	}
`
const PadTd = styled.td `
  padding-left: 20px;
`
const Date = styled.td `
  min-width: 14%;
`

export default function ReviewItem({ id, comment, index, moveCard, date,name }) {
  const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: () => {
			return {id ,index};
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	
  return (
	<>
	<TRow ref={ref}  data-handler-id={handlerId} style={{ ...style, opacity }} >
		<PadTd>{name} <br />245-{id}48</PadTd>
		<Date>{convertDate(date)}</Date>
		<td>{comment}</td>
		
	</TRow>
	
	</>                      
	);                        
}   
