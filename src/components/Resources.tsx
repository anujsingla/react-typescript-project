import { find, map } from "lodash";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { useAddNewResource, useDeleteResource, useEditResource } from "../hooks/ResourceMutations";
import { useGetResource } from "../hooks/ResourcesQuery"
import { ToastNotificaton } from "./ToastNotification";
import { ResourceModal } from './ResourceModal';
import { IResource } from "../models/apiUtils";
import { useState } from "react";

const Mode = {
    NEW: 'New',
    EDIT: 'Edit'
}

export const Resources = () => {
    const { data, isLoading, isError, refetch } = useGetResource();
    const deleteMutate = useDeleteResource();
    const addNewMutate = useAddNewResource();
    const editMutate = useEditResource();
    const [mode, setMode] = useState(Mode.EDIT);
    const [showModal, setShowModal] = useState(false);

    const [resource, setResource] = useState<Partial<IResource>>({});

    const handleClose = () => {
        setShowModal(false);
        setResource({});
    }
    const handleShow = (id: number | undefined, mode: string) => {
        setShowModal(true);
        setResource(id === undefined ? {} : find(data, d => d.id === id) || {});
        setMode(mode);
    }
    if (isLoading) {
        return <Spinner animation="border" />
    } else if (isError) {
        return <div>Data fetching error</div>
    }

    const deleteResource = async (id: number) => {
        try {
            await deleteMutate.mutateAsync({
                id: id
            });
            refetch();
            ToastNotificaton.addSuccessMessage('Successfully deleted Resource');
        } catch (e) {
            ToastNotificaton.addErrorMessage('Error in deleting Resource');
        }
    }

    const renderButtons = (id: number) => {
        return (
            <div>
                <Button onClick={() => handleShow(id, Mode.EDIT)} variant="outline-primary">Edit</Button>
                <Button disabled={deleteMutate.isLoading} onClick={() => deleteResource(id)} variant="outline-primary">Delete</Button>
            </div>
        )
    }

    const onSave = async (res: Partial<IResource>) => {
        if (mode === Mode.EDIT) {
            await editMutate.mutateAsync({ resource: res });
            handleClose();
            refetch();
            ToastNotificaton.addSuccessMessage('Edited successfully');
        } else if (mode === Mode.NEW) {
            await addNewMutate.mutateAsync({ resource: res });
            handleClose();
            refetch();
            ToastNotificaton.addSuccessMessage('Added new resource');
        }
    }

    return (
        <div className="mt-5">
            <Button onClick={() => handleShow(undefined, Mode.NEW)} className="mb-4" variant="primary" size="lg">Add Resource</Button>
            <div>
                {map(data, (d) =>
                    <ListGroup key={d.id} horizontal="sm">
                        <ListGroup.Item>{d.id}</ListGroup.Item>
                        <ListGroup.Item>{d.title}</ListGroup.Item>
                        {renderButtons(d.id)}
                    </ListGroup>
                )}
            </div>
            <ResourceModal
                mode={mode}
                show={showModal}
                handleClose={handleClose}
                onSave={onSave}
                resource={resource}
            />
        </div>
    )
}