import { useEffect, useState } from "react";
import { IResource } from "../models/apiUtils";
import { Button, Modal, Form } from "react-bootstrap"


interface IProps {
    show: boolean;
    handleClose: () => void;
    onSave: (resource: Partial<IResource>) => void;
    resource: Partial<IResource>;
    mode: string;
}

export const ResourceModal = (props: IProps) => {
    const [resource, setResource] = useState(props.resource);

    useEffect(() => {
        setResource(props.resource);
    }, [props.resource]);

    const onChangeValue = (event: any) => {
        setResource({
            ...resource,
            title: event.target.value
        })
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.mode} Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Resource</Form.Label>
                        <Form.Control onChange={onChangeValue} value={resource?.title ?? ''} type="text" placeholder="Resource" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => props.onSave(resource)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}