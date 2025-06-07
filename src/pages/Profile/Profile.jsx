import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  ProfileActions,
  ProfileAvatar,
  ProfileBackground,
  ProfileContainer,
  ProfileHeader,
  ProfileIconAdd,
  ProfileIconEdit,
  ProfilePosts,
  ProfileUser,
} from "./ProfileStyled";
import { getAllPostsByUser } from "../../services/postsServices";
import { getAllInsurances } from "../../services/insuranceServices";
import { getAllInsurers } from "../../services/insurerServices";
import { Card } from "../../components/Card/Card";
import { Link } from "react-router-dom";

export function Profile() {
  const { user } = useContext(UserContext);
  const [insurer, setInsurer] = useState([]);
  const [insrance, setInsurance] = useState([]);
  const [posts, setPosts] = useState([]);

  async function findAllPostsByUser() {
    const postsResponse = await getAllPostsByUser();
    setPosts(postsResponse.data.postsByUser);
  }

  async function findAllInsurers() {
    getAllInsurers().then((insurers) => {
      setInsurer(insurers);
    });
  }

  useEffect(() => {
    findAllPostsByUser();
    findAllInsurers()
  }, []);

  console.log(insurer);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileIconEdit>
          <i className="bi bi-pencil-square"></i>
        </ProfileIconEdit>

        <ProfileBackground src={user.background} alt="" />

        <ProfileUser>
          <ProfileAvatar src={user.avatar} alt="Foto do usuário" />
          <h2>{user.name}</h2>
          <h3>@{user.username}</h3>
        </ProfileUser>

        <ProfileActions>
          <font style={{fontWeight: 'bold'}}>Novo Seguro</font>
          <Link to="/manage-news-insurances/add/news">
            <ProfileIconAdd>
              <i className="bi bi-plus-circle"></i>
            </ProfileIconAdd>
          </Link>
        </ProfileActions>
        <ProfileActions>
          <font style={{fontWeight: 'bold'}}>Nova Seguradora</font>
          <Link to="/manage-news-insurers/add/news">
            <ProfileIconAdd>
              <i className="bi bi-plus-circle"></i>
            </ProfileIconAdd>
          </Link>
        </ProfileActions>
      </ProfileHeader>
    </ProfileContainer>
  );
}
